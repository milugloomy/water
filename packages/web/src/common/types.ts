export enum PositionType {
  common = 1,
  duplicate,
  leftBottom,
  rightBottom
}

export const PositionTextMap = new Map();
PositionTextMap.set(PositionType.common, '自定义');
PositionTextMap.set(PositionType.duplicate, '平铺');
PositionTextMap.set(PositionType.leftBottom, '左下');
PositionTextMap.set(PositionType.rightBottom, '右下');

export const PositionOptions: { value: number; label: string }[] = [];
PositionTextMap.forEach((value, key) => {
  PositionOptions.push({
    value: key,
    label: value,
  });
});
