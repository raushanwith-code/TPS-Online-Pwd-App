import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting TPS ONLINE CLASSES database seed...');

  // Upsert Subjects
  const math = await prisma.subject.upsert({
    where: { code: 'math' },
    update: {},
    create: {
      name: 'Mathematics',
      hindiName: 'गणित',
      code: 'math',
      description: 'वास्तविक संख्याएं, बहुपद, त्रिकोणमिति, द्विघात समीकरण, त्रिभुज, सांख्यिकी एवं प्रायिकता',
      accentColor: '#38bdf8',
      order: 1,
    },
  });

  const science = await prisma.subject.upsert({
    where: { code: 'science' },
    update: {},
    create: {
      name: 'Science',
      hindiName: 'विज्ञान',
      code: 'science',
      description: 'भौतिकी (Physics), रसायन शास्त्र (Chemistry), जीव विज्ञान (Biology)',
      accentColor: '#a855f7',
      order: 2,
    },
  });

  const sst = await prisma.subject.upsert({
    where: { code: 'sst' },
    update: {},
    create: {
      name: 'Social Science',
      hindiName: 'सामाजिक विज्ञान',
      code: 'sst',
      description: 'इतिहास, भूगोल, राजनीति विज्ञान, अर्थशास्त्र और आपदा प्रबंधन',
      accentColor: '#f59e0b',
      order: 3,
    },
  });

  const english = await prisma.subject.upsert({
    where: { code: 'english' },
    update: {},
    create: {
      name: 'English',
      hindiName: 'अंग्रेजी',
      code: 'english',
      description: 'Panorama Part-2 (Prose & Poetry), English Grammar & Composition',
      accentColor: '#10b981',
      order: 4,
    },
  });

  const hindi = await prisma.subject.upsert({
    where: { code: 'hindi' },
    update: {},
    create: {
      name: 'Hindi',
      hindiName: 'हिंदी',
      code: 'hindi',
      description: 'गोधूलि भाग-2 (गद्य एवं पद्य खंड), वर्णिका भाग-2 एवं हिंदी व्याकरण',
      accentColor: '#ec4899',
      order: 5,
    },
  });

  console.log('✅ 5 Subjects seeded successfully!');
  console.log('🌟 TPS Database Ready for 1000+ Students!');
}

main()
  .catch((e) => {
    console.error('Seed notice:', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
