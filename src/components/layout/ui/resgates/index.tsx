import { Img } from "../img"
import { Avatar } from "@/components/layout/daisy/data-display/avatar"
import { AvatarGroup } from "@/components/layout/daisy/data-display/avatar-group"

type ResgatesProps = {
    count?: number;
    socorristas: Array<{
        nome: string;
        img: string;
    }>;
}

export function Resgates({ count = 400, socorristas }: ResgatesProps) {
    return (
        <div className="mt-12 flex items-center gap-4">
            <AvatarGroup>
                {socorristas.map((socorrista, index) => (
                    <Avatar key={index} className="border-base-100">
                        <Img src={socorrista.img} alt={`Rescuer ${index + 1}`} />
                    </Avatar>
                ))}
            </AvatarGroup>
            <p className="text-sm font-semibold opacity-70">+{count} resgates realizados</p>
        </div>
    )
}
