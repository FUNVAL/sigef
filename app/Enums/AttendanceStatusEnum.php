<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum AttendanceStatusEnum: int
{
    use EnumMethods;

    case PRESENT = 1;
    case ABSENT = 2;
    case EXCUSED = 3;
    case LATE = 4;

    public function name(): string
    {
        return match ($this) {
            self::PRESENT => __('common.enums.attendance_status.present'),
            self::ABSENT => __('common.enums.attendance_status.absent'),
            self::EXCUSED => __('common.enums.attendance_status.justified'),
            self::LATE => __('common.enums.attendance_status.late'),
        };
    }
}
