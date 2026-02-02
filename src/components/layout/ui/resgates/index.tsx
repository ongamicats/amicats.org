import { Avatar } from "@/components/layout/daisy/data-display/avatar"
import { AvatarGroup } from "@/components/layout/daisy/data-display/avatar-group"
import { Img } from "../img"

export function Resgates() {
    return (
        <div className="mt-12 flex items-center gap-4">
            <AvatarGroup>
                <Avatar className="border-base-100">
                    <Img src="https://i.pravatar.cc/100?img=1" alt="Rescuer 1" />
                </Avatar>
                <Avatar className="border-base-100">
                    <Img src="https://i.pravatar.cc/100?img=2" alt="Rescuer 2" />
                </Avatar>
                <Avatar className="border-base-100">
                    <Img src="https://i.pravatar.cc/100?img=3" alt="Rescuer 3" />
                </Avatar>
            </AvatarGroup>
            <p className="text-sm font-semibold opacity-70">+400 resgates realizados</p>
        </div>
    )
}
