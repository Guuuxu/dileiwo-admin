export const packageType: any = {
  0: '月卡',
  1: '季卡',
  2: '年卡',
  3: '连续包月',
  4: '连续包年',
};
export const damageReasons: any = [
  { label: '疑品申报', value: 0 },
  { label: '外观破损', value: 1 },
  { label: '内层破损', value: 2 },
  { label: '表面割裂', value: 3 },
  { label: '拉链损坏', value: 4 },
  { label: '拼接块脱落', value: 5 },
  { label: '恶意涂鸦', value: 6 },
  { label: '其他', value: 7 },
];

export const roleOptions = [
  { label: '管理员', value: 1 },
  { label: '操作员', value: 2 },
  { label: '代工厂', value: 3 },
];
export const outboundOrderStatusOptions = [
  { label: '已创建', value: 0 },
  { label: '发送手机', value: 1 },
  { label: '客户收到', value: 2 },
];
// 损坏上报状态
export const damageReportStatusOptions = [
  { label: '待验证', value: 0 },
  { label: '已验证', value: 1 },
  { label: '待维修', value: 2 },
  { label: '已完成', value: 3 },
];
// 出库单明细状态
export const outboundOrderDetailStatusOptions = [
  { label: '已创建', value: 0 },
  { label: '已回收', value: 1 },
  { label: '已损坏', value: 2 },
  { label: '已出库', value: 3 },
  { label: '已出库', value: 4 },
  { label: '已出库', value: 5 },
];
