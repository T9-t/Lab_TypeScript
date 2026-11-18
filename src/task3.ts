type UserId = string & { readonly brand: unique symbol };

function isUserId(value: unknown): value is UserId {
    if (typeof value !== 'string') {
        return false;
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}

interface UserProfile {
  id: UserId;
  name: string;
}

function getUserProfile(id: UserId): UserProfile {
  return {
    id,
    name: 'Новый пользователь'
  }
}

function handleUserRequest(rawInput: unknown): void {
  console.log('Входное значение:', rawInput);

  if (isUserId(rawInput)) {
    const profile = getUserProfile(rawInput);
    console.log('Профиль получен:', profile);

  } else {
    console.log('Ошибка: переданное значение не является корректным UserId.');
  }
}

const validUuid = '550e8400-e29b-41d4-a716-446655440000';
handleUserRequest(validUuid);

const invalidString = 'not-a-valid-uuid-12345';
handleUserRequest(invalidString);

const wrongType = 987654321;
handleUserRequest(wrongType);