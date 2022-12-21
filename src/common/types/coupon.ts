
export interface CouponType {
    couponId: number;
    userId: number;
    couponManagerId: number;
    isUsed: number;
    registDt: string;
    expireDt: string;
    couponType: string;
    discountNum: number;
  }
  
export interface CouponType2 {
    couponId: number
    couponManagerId: number
    couponType: string
    discountNum: number
    expireDt: string
    isUsed: number
    isValid: number
    registDt: string
    userId: number
  }