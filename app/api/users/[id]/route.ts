import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


type Params = {
    params: {
        id: string;
    };
};

type TData = {
    name?: string;
    family?: string;
    age?: number;
    liked?: boolean;
};

export async function GET(_req: Request, { params }: Params) {
    
    const Params = await params
    const id = Number(Params.id);

    if(Number.isNaN(id)){
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const item = await prisma.user.findUnique({ where: { id } });
    if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
}



export async function PATCH(req: Response , { params }: Params) {
    
    const Params = await params
    const id = Number(Params.id);

    if(Number.isNaN(id)){
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();

    const data: TData = {};
    if(typeof body.name === "string") data.name = body.name;
    if(typeof body.family === "string") data.family = body.family;
    if(typeof body.age === "number") data.age = body.age;
    if(typeof body.liked === "boolean") data.liked = body.liked;

    if(Object.keys(data).length === 0){
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    try{
        const updated = await prisma.user.update({ where: { id }, data });
        return NextResponse.json(updated);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (e) {
        return NextResponse.json({ error: "update failed" }, { status: 500 });
    }
}



export async function DELETE(_req: Request, { params }: Params) {
    const Params = await params
    const id = Number(Params.id);

    if(Number.isNaN(id)){
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try{
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "Item deleted" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (e) {
        return NextResponse.json({ error: "delete failed" }, { status: 500 });
    }

}