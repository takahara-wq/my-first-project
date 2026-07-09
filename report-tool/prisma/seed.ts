import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.document.deleteMany();
  await prisma.construction.deleteMany();
  await prisma.customer.deleteMany();

  const tanaka = await prisma.customer.create({
    data: {
      name: "田中 一郎",
      nameKana: "タナカイチロウ",
      address: "東京都世田谷区成城3-1-1",
      phone: "090-1234-5678",
      contactPerson: "田中 一郎",
      constructions: {
        create: [
          {
            contractDate: new Date("2026-03-15"),
            title: "外壁塗装（シリコン2回）",
            progress: "見積・下見",
          },
          {
            contractDate: new Date("2024-10-01"),
            title: "屋根部分補修",
            progress: "完了",
          },
        ],
      },
      documents: {
        create: [
          { folder: "見積書", fileName: "外壁塗装_見積_2026-05.pdf", fileSize: "248 KB" },
          { folder: "契約書", fileName: "外壁塗装_契約書_草案.pdf", fileSize: "512 KB" },
          { folder: "工事写真", fileName: "下見_南面_2026-05-20.jpg", fileSize: "1.2 MB" },
          { folder: "保証書", fileName: "屋根補修_保証書_2024.pdf", fileSize: "180 KB" },
        ],
      },
    },
  });

  const sato = await prisma.customer.create({
    data: {
      name: "佐藤 美咲",
      nameKana: "サトウミサキ",
      address: "神奈川県横浜市青葉区美しが丘2-5-10",
      phone: "045-555-1234",
      contactPerson: "佐藤 美咲（管理組合）",
      constructions: {
        create: [
          {
            contractDate: new Date("2026-01-20"),
            title: "マンション共用部塗装",
            progress: "足場組立（55%）",
          },
          {
            contractDate: new Date("2026-02-10"),
            title: "屋上防水工事",
            progress: "下地処理（40%）",
          },
        ],
      },
      documents: {
        create: [
          { folder: "見積書", fileName: "共用部塗装_入札見積.pdf", fileSize: "890 KB" },
          { folder: "契約書", fileName: "共用部塗装_契約書_正本.pdf", fileSize: "1.1 MB" },
          { folder: "工事写真", fileName: "足場組立_2026-05-18.jpg", fileSize: "2.4 MB" },
          { folder: "点検記録", fileName: "中間点検_2026-05.pdf", fileSize: "320 KB" },
        ],
      },
    },
  });

  const suzuki = await prisma.customer.create({
    data: {
      name: "鈴木 健太",
      nameKana: "スズキケンタ",
      address: "神奈川県川崎市中原区木月1-8-3",
      phone: "044-777-8899",
      contactPerson: "鈴木 健太",
      constructions: {
        create: [
          {
            contractDate: new Date("2026-05-01"),
            title: "新築3棟 外壁下請け",
            progress: "契約準備（10%）",
          },
        ],
      },
      documents: {
        create: [
          { folder: "見積書", fileName: "下請単価表_2026.xlsx", fileSize: "96 KB" },
          { folder: "契約書", fileName: "基本取引契約書.pdf", fileSize: "420 KB" },
        ],
      },
    },
  });

  const takahashi = await prisma.customer.create({
    data: {
      name: "高橋 由美",
      nameKana: "タカハシユミ",
      address: "東京都調布市布田4-2-7",
      phone: "042-444-5566",
      contactPerson: "高橋 由美",
      constructions: {
        create: [
          {
            contractDate: new Date("2025-11-01"),
            title: "屋根・外壁同時施工",
            progress: "完工・引渡し（100%）",
          },
        ],
      },
      documents: {
        create: [
          { folder: "契約書", fileName: "施工契約書_正本.pdf", fileSize: "680 KB" },
          { folder: "工事写真", fileName: "完工写真_全体.jpg", fileSize: "3.1 MB" },
          { folder: "保証書", fileName: "10年保証書.pdf", fileSize: "210 KB" },
          { folder: "点検記録", fileName: "1ヶ月点検_予定.pdf", fileSize: "150 KB" },
        ],
      },
    },
  });

  console.log("登録完了:", [tanaka.name, sato.name, suzuki.name, takahashi.name].join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
