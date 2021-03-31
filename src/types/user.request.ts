export interface CreateUserParams {
  workId: string;
  //证件照
  workerPicture: File | Blob | undefined;
  //身份证照
  idPicture: File | Blob | undefined;
  //姓名
  name: string;
  //身份证号码
  idNumber: string;
  //工作种类
  workCategory: string;
  //银行卡号
  bankCardNumber: string;
  //工资卡开户银行
  depositBank: string;
  //联系电话
  phone: string;
  //地址
  address: string;
  //工作技能等级
  skillLevel: string;
  //备用联系人姓名
  contactName: string;
  //备用联系人联系电话
  contactPhone: string;
  //赡养老人(抵扣计量单位)
  supportOldUnity?: string;
  //赡养老人(抵扣金额)
  supportOldMoney?: number;
  //赡养老人(抵扣说明)
  supportOldDescription?: string;
  //抚养小孩(抵扣计量单位)
  raiseChildrenUnit?: string;
  //抚养小孩(抵扣金额)
  raiseChildrenMoney?: number;
  //抚养小孩(抵扣说明)
  raiseChildrenDescription?: string;
  //房租/房贷(抵扣计量单位)
  houseRentUnit?: string;
  //房租/房贷(抵扣金额)
  houseRentMoney?: number;
  //房租/房贷(抵扣说明)
  houseRentDescription?: string;
  //继续教育(抵扣计量单位)
  continueEducationUnit?: string;
  //继续教育(抵扣金额)
  continueEducationMoney?: number;
  //继续教育(抵扣说明)
  continueEducationDescription?: string;
}
export type CreateUserParamsKey = keyof CreateUserParams;
export interface IdentifyIDCardParams {
  ImageBase64?: string;
  ImageUrl?: string;
  CardSide?: 'FRONT' | 'BACK';
  Config?: string;
}
export interface IDCardOCRResponse {
  /**
   * 姓名（人像面）
   */
  Name?: string;

  /**
   * 性别（人像面）
   */
  Sex?: string;

  /**
   * 民族（人像面）
   */
  Nation?: string;

  /**
   * 出生日期（人像面）
   */
  Birth?: string;

  /**
   * 地址（人像面）
   */
  Address?: string;

  /**
   * 身份证号（人像面）
   */
  IdNum?: string;

  /**
   * 发证机关（国徽面）
   */
  Authority?: string;

  /**
   * 证件有效期（国徽面）
   */
  ValidDate?: string;

  /**
   * 扩展信息，不请求则不返回，具体输入参考示例3和示例4。
   IdCard，裁剪后身份证照片的base64编码，请求 Config.CropIdCard 时返回；
   Portrait，身份证头像照片的base64编码，请求 Config.CropPortrait 时返回；

   Quality，图片质量分数，请求 Config.Quality 时返回（取值范围：0~100，分数越低越模糊，建议阈值≥50）;
   BorderCodeValue，身份证边框不完整告警阈值分数，请求 Config.BorderCheckWarn时返回（取值范围：0~100，分数越低边框遮挡可能性越低，建议阈值≥50）;

   WarnInfos，告警信息，Code 告警码列表和释义：
   -9100	身份证有效日期不合法告警，
   -9101	身份证边框不完整告警，
   -9102	身份证复印件告警，
   -9103	身份证翻拍告警，
   -9105	身份证框内遮挡告警，
   -9104	临时身份证告警，
   -9106	身份证 PS 告警，
   -9107       身份证反光告警。
   */
  AdvancedInfo?: string;

  /**
   * 唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
   */
  RequestId?: string;
}
