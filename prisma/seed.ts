import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    const user = await  prisma.user.upsert({
        update: {},
        create: {
            id: 1,
            username: 'johndoe'
        },
        where: {
            id: 1
        }
    })

    const device = await  prisma.device.upsert({
        update: {},
        create: {
            id: 1,
            name: 'raspberry pi'
        },
        where: {
            id: 1
        }
    })
}

main().catch(e => console.log(e)).finally( async () =>{
    await prisma.$disconnect()
})