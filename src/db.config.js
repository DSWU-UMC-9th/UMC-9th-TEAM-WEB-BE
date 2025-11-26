import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  const keywords = [
    { name: "소설" },
    { name: "시" },
    { name: "에세이" },
    { name: "추리" },
    { name: "판타지" },
    { name: "SF" },
    { name: "고전" },
    { name: "문학" },
    { name: "자기개발" },
    { name: "경제경영" },
    { name: "재테크" },
    { name: "건강" },
    { name: "요리" },
    { name: "취미" },
    { name: "여행" },
    { name: "회복탄력성" },
    { name: "번아웃" },
    { name: "인공지능" },
    { name: "미니멀리즘" },
    { name: "루틴" },
    { name: "불안" },
    { name: "미국주식" },
    { name: "웹툰" },
    { name: "교양" },
    { name: "기술" },
    { name: "인간관계" },
    { name: "예술" },
    { name: "종교" },
    { name: "인문학" },
    { name: "심리" }
  ];

  for (const k of keywords) {
    await prisma.keyword.upsert({
      where: { name: k.name },
      update: {},
      create: k,
    });
  }
  console.log("Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });