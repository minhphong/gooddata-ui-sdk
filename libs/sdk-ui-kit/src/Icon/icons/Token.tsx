// (C) 2021-2022 GoodData Corporation
import React from "react";

import { IIconProps } from "../typings";

/**
 * @internal
 */
export const Token: React.FC<IIconProps> = ({ color, className, width, height }) => {
    return (
        <svg
            className={className}
            width={width ?? 14}
            height={height ?? 14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.5 0C10.0169 0 9.5612 0.0934245 9.13281 0.280273C8.70898 0.462565 8.33757 0.713216 8.01855 1.03223C7.7041 1.34668 7.45573 1.71582 7.27344 2.13965C7.09115 2.56348 7 3.01693 7 3.5C7 3.87826 7.05469 4.23828 7.16406 4.58008C7.27799 4.92188 7.43522 5.23405 7.63574 5.5166L0.102539 13.0566C0.0341797 13.125 0 13.207 0 13.3027C0 13.3984 0.0341797 13.4805 0.102539 13.5488C0.13444 13.5853 0.170898 13.6104 0.211914 13.624C0.257487 13.6423 0.30306 13.6514 0.348633 13.6514C0.394206 13.6514 0.4375 13.6423 0.478516 13.624C0.524089 13.6104 0.562826 13.5853 0.594727 13.5488L1.40137 12.749L2.5498 13.8975C2.58626 13.9339 2.625 13.959 2.66602 13.9727C2.71159 13.9909 2.75716 14 2.80273 14C2.84375 14 2.88477 13.9909 2.92578 13.9727C2.97135 13.959 3.01237 13.9339 3.04883 13.8975C3.11719 13.8291 3.15137 13.7471 3.15137 13.6514C3.15137 13.5557 3.11719 13.4736 3.04883 13.4053L1.89355 12.25L2.44727 11.6963L3.60254 12.8516C3.63444 12.8835 3.6709 12.9085 3.71191 12.9268C3.75749 12.945 3.80306 12.9541 3.84863 12.9541C3.89421 12.9541 3.9375 12.945 3.97852 12.9268C4.02409 12.9085 4.06283 12.8835 4.09473 12.8516C4.16309 12.7832 4.19727 12.7012 4.19727 12.6055C4.19727 12.5052 4.16309 12.4209 4.09473 12.3525L2.94629 11.2041L8.10059 6.0498C8.25553 6.19564 8.42415 6.3278 8.60645 6.44629C8.78874 6.56478 8.98014 6.66504 9.18066 6.74707C9.38574 6.8291 9.59766 6.8929 9.81641 6.93848C10.0397 6.97949 10.2676 7 10.5 7C10.9831 7 11.4365 6.90885 11.8604 6.72656C12.2887 6.54427 12.6602 6.2959 12.9746 5.98145C13.2936 5.66243 13.5443 5.29102 13.7266 4.86719C13.9089 4.4388 14 3.98307 14 3.5C14 3.01693 13.9089 2.56348 13.7266 2.13965C13.5443 1.71582 13.2936 1.34668 12.9746 1.03223C12.6602 0.713216 12.2887 0.462565 11.8604 0.280273C11.4365 0.0934245 10.9831 0 10.5 0ZM12.4824 5.48242C12.3503 5.61458 12.2067 5.73307 12.0518 5.83789C11.9014 5.93815 11.7419 6.02246 11.5732 6.09082C11.4046 6.15918 11.2292 6.21159 11.0469 6.24805C10.8691 6.28451 10.6868 6.30273 10.5 6.30273C10.3132 6.30273 10.1286 6.28451 9.94629 6.24805C9.76855 6.21159 9.59538 6.15918 9.42676 6.09082C9.25814 6.02246 9.09635 5.93815 8.94141 5.83789C8.79102 5.73307 8.64974 5.61458 8.51758 5.48242C8.38542 5.35026 8.26921 5.20898 8.16895 5.05859C8.06868 4.90365 7.9821 4.74186 7.90918 4.57324C7.84082 4.40462 7.78841 4.23145 7.75195 4.05371C7.71549 3.87142 7.69727 3.68685 7.69727 3.5C7.69727 3.31315 7.71549 3.13086 7.75195 2.95312C7.78841 2.77083 7.84082 2.59766 7.90918 2.43359C7.9821 2.26497 8.06868 2.10547 8.16895 1.95508C8.26921 1.80013 8.38542 1.65658 8.51758 1.52441C8.64974 1.39225 8.79102 1.27604 8.94141 1.17578C9.09635 1.07096 9.25814 0.984375 9.42676 0.916016C9.59538 0.847656 9.76855 0.795247 9.94629 0.758789C10.1286 0.722331 10.3132 0.704102 10.5 0.704102C10.6868 0.704102 10.8691 0.722331 11.0469 0.758789C11.2292 0.795247 11.4046 0.847656 11.5732 0.916016C11.7419 0.984375 11.9014 1.07096 12.0518 1.17578C12.2067 1.27604 12.3503 1.39225 12.4824 1.52441C12.6146 1.65658 12.7308 1.80013 12.8311 1.95508C12.9313 2.10547 13.0156 2.26497 13.084 2.43359C13.1569 2.59766 13.2116 2.77083 13.248 2.95312C13.2845 3.13086 13.3027 3.31315 13.3027 3.5C13.3027 3.68685 13.2845 3.87142 13.248 4.05371C13.2116 4.23145 13.1569 4.40462 13.084 4.57324C13.0156 4.74186 12.9313 4.90365 12.8311 5.05859C12.7308 5.20898 12.6146 5.35026 12.4824 5.48242Z"
                fill={color ?? "#94A1AD"}
            />
        </svg>
    );
};
