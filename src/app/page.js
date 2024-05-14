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
      votes: true,
    },
  })

  const factoidCount = await prisma.factoid.count();

  if (!initialCards.length) return notFound();

  return (
    <MaxWidthWrapper className="mb-12 mt-8 flex flex-col md:flex-row-reverse md:items-start md:justify-center">
      <Sidebar session={session} factoidCount={factoidCount} className="order-1 md:order-2" />
      <InfiniteCards initialCards={initialCards} className="order-2 md:order-1" />
    </MaxWidthWrapper>
  );
}
