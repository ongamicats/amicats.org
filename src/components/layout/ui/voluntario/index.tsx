import { Flex } from "../flex"
import { Img } from "@/components/layout/ui/img"

export interface VoluntarioProps {
    nome: string
    funcao: string
    imagem: string
}

export function Voluntario({ nome, funcao, imagem }: VoluntarioProps) {
    return (
        <Flex className="flex-col items-center group">
            <div className="w-[30vw] h-[30vw] sm:w-35 sm:h-35 rounded-full overflow-hidden mb-3 md:mb-6 border-4 border-base-200 shadow-lg group-hover:border-primary transition-all duration-300">
                <Img
                    src={imagem}
                    alt={nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h3 className="text-base md:text-lg font-bold">{nome}</h3>
            <p className="text-xs md:text-sm text-primary font-medium text-center">{funcao}</p>
        </Flex>
    )
}
