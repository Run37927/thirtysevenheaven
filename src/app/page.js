import InfiniteCards from "@/components/InfiniteCards";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  const initialCards = await prisma.factoid.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
    include: {
      author: {
        select: {
          name: true,
          username: true,
        },
      },
      categories: true,
    },
  })

  if (!initialCards.length) return notFound();

  return (
    <MaxWidthWrapper className="mb-12 mt-8 flex items-start justify-center">
      <InfiniteCards initialCards={initialCards} />
      <Sidebar session={session} />
    </MaxWidthWrapper>
  );
}
