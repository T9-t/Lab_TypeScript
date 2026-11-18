type DeepReadonly<T> = T extends readonly (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends Record<string, unknown>
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (obj === null || typeof obj !== "object") {
    return obj as DeepReadonly<T>;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      deepFreeze(item);
    }
    return Object.freeze(obj) as DeepReadonly<T>;
  }
  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key];
    deepFreeze(value);
  }
  return Object.freeze(obj) as DeepReadonly<T>;
}


const config = deepFreeze({
  appName: "BillingService",
  server: {
    host: "127.0.0.1",
    ports: 2,
    ssl: {
      enabled: true,
    },
  },
  admins: [
    { id: 1, role: "owner" },
    { id: 2, role: "editor" },
  ],
});

console.log("config:", Object.isFrozen(config));
console.log("config.server:", Object.isFrozen(config.server));
console.log("config.server.ports:", Object.isFrozen(config.server.ports));
console.log("config.server.ssl:", Object.isFrozen(config.server.ssl));
console.log("config.admins:", Object.isFrozen(config.admins));
console.log("config.admins[0]:", Object.isFrozen(config.admins[0]));

const runtimeMutations: Array<{ label: string; execute: () => void }> = [
  {
    label: "Переопределение корневого свойства (config.appName)",
    execute: () => {
      Object.defineProperty(config, "appName", { value: "AuthService" });
    },
  },
  {
    label: "Переопределение вложенного свойства (config.server.host)",
    execute: () => {
      Object.defineProperty(config.server, "host", { value: "0.0.0.0" });
    },
  },
  {
    label: "Переопределение глубокого свойства (config.server.ssl.enabled)",
    execute: () => {
      Object.defineProperty(config.server.ssl, "enabled", { value: false });
    },
  },
  {
    label: "Вызов мутирующего метода массива через prototype (config.admins.push)",
    execute: () => {
      Array.prototype.push.call(config.admins, { id: 3, role: "viewer" });
    },
  },
  {
    label: "Переопределение свойства объекта внутри массива (config.admins.role)",
    execute: () => {
      Object.defineProperty(config.admins, "role", { value: "guest" });
    },
  },
];

for (const { label, execute } of runtimeMutations) {
  try {
    execute();
    console.log(`[FAIL] Мутация сработала: ${label}`);
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(`[OK] Перехвачен TypeError (${label}): ${error.message}`);
    } else {
      console.log(`[OK] Перехвачена ошибка (${label}):`, error);
    }
  }
}