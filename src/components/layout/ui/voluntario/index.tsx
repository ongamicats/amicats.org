import { Img } from "@/components/layout/ui/img"
import { Flex } from "../flex"

export interface VoluntarioProps {
    nome: string
    funcao: string
    imagem: string
}

export function Voluntario({ nome, funcao, imagem }: VoluntarioProps) {
    return (
        <Flex className="flex-col items-center group">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-base-200 shadow-lg group-hover:border-primary transition-all duration-300">
                <Img
                    src={imagem}
                    alt={nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h3 className="text-xl font-bold">{nome}</h3>
            <p className="text-primary font-medium">{funcao}</p>
        </Flex>
    )
}
