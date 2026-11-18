type RGBColor = [number, number, number];
enum ColorName { 
    Red = 'Red', 
    Green = 'Green', 
    Blue = 'Blue',
    IncorrectColor = 'Incorrect color'
};

const COLOR_MAP: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 128, 0],
  [ColorName.Blue]: [0, 0, 255],
  [ColorName.IncorrectColor]: [-1, 0, 255]
};

function rgbToHex(color: RGBColor): string {
    for (const channel of color){
        if (!Number.isInteger(channel) || channel < 0 || channel > 255){
            throw new RangeError(`Некорректное значение канала: ${channel}. Ожидается целое число от 0 до 255.`);
        }
    }
    const hexChannels = color.map((channel) =>
        channel.toString(16).padStart(2, '0')
    );
    return `#${hexChannels.join('')}`;
}

function getColorInfo(name: ColorName): { rgb: RGBColor; hex: string } {
    const rgb = COLOR_MAP[name];
    try {
        const hex = rgbToHex(rgb);
        return {rgb, hex};

    } catch (error) {
        if (error instanceof RangeError) {
            console.error(`Перехвачена ошибка RangeError: ${error.message}`);
        } 
        const hex = "none";
        return {rgb, hex};
    }
}


for (const colorName of Object.values(ColorName)) {
  const info = getColorInfo(colorName);
  console.log(`${colorName}: RGB(${info.rgb.join(', ')}) -> ${info.hex}`);
}