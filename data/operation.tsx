import assets from "@/assets";
import { AnnotationType } from "@/enums";

export const OPERATIONS = [
    { id: 1, title: "Văn bản", icon: assets.icon.aa_orange, width: 28, height: 16, type: AnnotationType[AnnotationType.Text] },
    { id: 2, title: "Thời gian", icon: assets.icon.clock_orange, width: 22, height: 22, type: AnnotationType[AnnotationType.Time] },
    { id: 3, title: "Vị trí", icon: assets.icon.discover_orange, width: 22, height: 22, type: AnnotationType[AnnotationType.Location] },
    { id: 4, title: "Thời tiết", icon: assets.icon.cloud_orange, width: 24, height: 24, type: AnnotationType[AnnotationType.Weather] }
]