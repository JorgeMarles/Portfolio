import "dotenv/config";
import { PrismaClient, ProjectStatus } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  await prisma.resource.deleteMany();
  await prisma.project.deleteMany();

  const project1 = await prisma.project.create({
    data: {
      title: "E-Commerce Microservices Platform",
      slug: "ecommerce-microservices",
      name: "ecommerce-platform",
      description: "A scalable e-commerce platform built with microservices architecture, featuring independent services for catalog, orders, payments, and notifications.",
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/ecommerce-microservices",
      demoUrl: "https://demo.ecommerce-platform.com",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      tags: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
      resources: {
        create: [
          {
            type: "REPOSITORY",
            title: "GitHub Repository",
            description: "Source code and documentation",
            url: "https://github.com/jorgemarles/ecommerce-microservices",
            order: 1,
          },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Real-Time Collaboration Tool",
      slug: "realtime-collab-tool",
      name: "collab-workspace",
      description: "A real-time collaborative workspace built with Next.js and WebSockets for instant synchronization across multiple users with live editing and presence indicators.",
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/realtime-collab",
      demoUrl: "https://collab.jorgemarles.dev",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      tags: ["TypeScript", "Next.js", "React", "PostgreSQL", "Redis", "Socket.io"],
      resources: {
        create: [
          {
            type: "REPOSITORY",
            title: "Source Code",
            url: "https://github.com/jorgemarles/realtime-collab",
            order: 1,
          },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "DevOps Automation CLI",
      slug: "devops-cli",
      name: "ops-cli",
      description: "A command-line tool for automating common DevOps tasks including deployments, infrastructure provisioning, monitoring, and instant rollback to previous versions.",
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/devops-cli",
      imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
      tags: ["Python", "Docker", "AWS", "Kubernetes"],
      resources: {
        create: [
          {
            type: "REPOSITORY",
            title: "GitHub Repository",
            url: "https://github.com/jorgemarles/devops-cli",
            order: 1,
          },
        ],
      },
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: "API Gateway with GraphQL Federation",
      slug: "graphql-gateway",
      name: "graphql-api-gateway",
      description: "A unified API gateway that federates multiple GraphQL microservices into a single endpoint with intelligent query optimization, caching, and rate limiting.",
      status: ProjectStatus.COMPLETED,
      featured: false,
      githubUrl: "https://github.com/jorgemarles/graphql-gateway",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      tags: ["TypeScript", "NestJS", "Redis", "GraphQL"],
      resources: {
        create: [
          {
            type: "REPOSITORY",
            title: "Source Code",
            url: "https://github.com/jorgemarles/graphql-gateway",
            order: 1,
          },
        ],
      },
    },
  });

  console.log("Seed completed successfully!");
  console.log(`Created 4 projects`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
