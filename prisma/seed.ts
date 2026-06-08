import "dotenv/config";
import { PrismaClient, ProjectStatus, TagCategory } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.resource.deleteMany();
  await prisma.projectTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.project.deleteMany();

  // Create tags
  const tags = await prisma.$transaction([
    // Languages
    prisma.tag.create({
      data: {
        name: "TypeScript",
        slug: "typescript",
        category: TagCategory.LANGUAGE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Go",
        slug: "go",
        category: TagCategory.LANGUAGE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Python",
        slug: "python",
        category: TagCategory.LANGUAGE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "JavaScript",
        slug: "javascript",
        category: TagCategory.LANGUAGE,
      },
    }),
    // Frameworks
    prisma.tag.create({
      data: {
        name: "Next.js",
        slug: "nextjs",
        category: TagCategory.FRAMEWORK,
      },
    }),
    prisma.tag.create({
      data: {
        name: "NestJS",
        slug: "nestjs",
        category: TagCategory.FRAMEWORK,
      },
    }),
    prisma.tag.create({
      data: {
        name: "React",
        slug: "react",
        category: TagCategory.FRAMEWORK,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Express",
        slug: "express",
        category: TagCategory.FRAMEWORK,
      },
    }),
    // Databases
    prisma.tag.create({
      data: {
        name: "PostgreSQL",
        slug: "postgresql",
        category: TagCategory.DATABASE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "MongoDB",
        slug: "mongodb",
        category: TagCategory.DATABASE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Redis",
        slug: "redis",
        category: TagCategory.DATABASE,
      },
    }),
    // Infrastructure
    prisma.tag.create({
      data: {
        name: "Docker",
        slug: "docker",
        category: TagCategory.INFRASTRUCTURE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "AWS",
        slug: "aws",
        category: TagCategory.INFRASTRUCTURE,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Kubernetes",
        slug: "kubernetes",
        category: TagCategory.INFRASTRUCTURE,
      },
    }),
    // Tools
    prisma.tag.create({
      data: {
        name: "Prisma",
        slug: "prisma",
        category: TagCategory.TOOL,
      },
    }),
    prisma.tag.create({
      data: {
        name: "GraphQL",
        slug: "graphql",
        category: TagCategory.TOOL,
      },
    }),
    prisma.tag.create({
      data: {
        name: "Socket.io",
        slug: "socketio",
        category: TagCategory.TOOL,
      },
    }),
  ]);

  console.log(`✅ Created ${tags.length} tags`);

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      title: "E-Commerce Microservices Platform",
      slug: "ecommerce-microservices",
      name: "ecommerce-platform",
      description: `# E-Commerce Microservices Platform

A scalable e-commerce platform built with microservices architecture, featuring independent services for catalog, orders, payments, and notifications.

## Key Features

- **Service Mesh**: Kubernetes-based orchestration with Istio for service-to-service communication
- **Event-Driven**: Apache Kafka for async messaging between services
- **API Gateway**: Centralized entry point with rate limiting and authentication
- **Observability**: Distributed tracing with Jaeger and metrics with Prometheus

## Technical Highlights

- Implemented CQRS pattern for order management
- Built custom circuit breaker for resilient service calls
- Deployed on AWS EKS with auto-scaling policies
- Achieved 99.9% uptime in production`,
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/ecommerce-microservices",
      demoUrl: "https://demo.ecommerce-platform.com",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project1.id, tagId: tags[1].id }, // Go
    }),
    prisma.projectTag.create({
      data: { projectId: project1.id, tagId: tags[8].id }, // PostgreSQL
    }),
    prisma.projectTag.create({
      data: { projectId: project1.id, tagId: tags[11].id }, // Docker
    }),
    prisma.projectTag.create({
      data: { projectId: project1.id, tagId: tags[13].id }, // Kubernetes
    }),
    prisma.resource.create({
      data: {
        projectId: project1.id,
        type: "REPOSITORY",
        title: "GitHub Repository",
        description: "Source code and documentation",
        url: "https://github.com/jorgemarles/ecommerce-microservices",
        order: 1,
      },
    }),
    prisma.resource.create({
      data: {
        projectId: project1.id,
        type: "LINK",
        title: "Architecture Diagram",
        description: "System architecture and data flow",
        url: "https://excalidraw.com/example",
        order: 2,
      },
    }),
  ]);

  const project2 = await prisma.project.create({
    data: {
      title: "Real-Time Collaboration Tool",
      slug: "realtime-collab-tool",
      name: "collab-workspace",
      description: `# Real-Time Collaboration Tool

A real-time collaborative workspace similar to Notion, built with Next.js and WebSockets for instant synchronization across multiple users.

## Features

- **Live Editing**: Simultaneous editing with operational transformation
- **Rich Text Editor**: Custom editor with markdown support
- **Presence Indicators**: See who's viewing and editing in real-time
- **Conflict Resolution**: Automatic merge of concurrent changes

## Technical Stack

- Next.js 14 with App Router and Server Components
- Socket.io for WebSocket connections
- Redis for session management and pub/sub
- PostgreSQL with row-level security`,
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/realtime-collab",
      demoUrl: "https://collab.jorgemarles.dev",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[0].id }, // TypeScript
    }),
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[4].id }, // Next.js
    }),
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[6].id }, // React
    }),
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[8].id }, // PostgreSQL
    }),
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[10].id }, // Redis
    }),
    prisma.projectTag.create({
      data: { projectId: project2.id, tagId: tags[16].id }, // Socket.io
    }),
    prisma.resource.create({
      data: {
        projectId: project2.id,
        type: "REPOSITORY",
        title: "Source Code",
        url: "https://github.com/jorgemarles/realtime-collab",
        order: 1,
      },
    }),
    prisma.resource.create({
      data: {
        projectId: project2.id,
        type: "LINK",
        title: "Live Demo",
        description: "Try the collaborative workspace",
        url: "https://collab.jorgemarles.dev",
        order: 2,
      },
    }),
  ]);

  const project3 = await prisma.project.create({
    data: {
      title: "DevOps Automation CLI",
      slug: "devops-cli",
      name: "ops-cli",
      description: `# DevOps Automation CLI

A command-line tool for automating common DevOps tasks including deployments, infrastructure provisioning, and monitoring.

## Commands

- \`ops deploy\` - Deploy applications to Kubernetes clusters
- \`ops provision\` - Provision infrastructure using Terraform
- \`ops monitor\` - Real-time logs and metrics aggregation
- \`ops rollback\` - Instant rollback to previous versions

## Built With

- Python with Click framework for CLI
- Boto3 for AWS integration
- kubectl Python client for Kubernetes
- Rich library for beautiful terminal output`,
      status: ProjectStatus.COMPLETED,
      featured: true,
      githubUrl: "https://github.com/jorgemarles/devops-cli",
      imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project3.id, tagId: tags[2].id }, // Python
    }),
    prisma.projectTag.create({
      data: { projectId: project3.id, tagId: tags[11].id }, // Docker
    }),
    prisma.projectTag.create({
      data: { projectId: project3.id, tagId: tags[12].id }, // AWS
    }),
    prisma.projectTag.create({
      data: { projectId: project3.id, tagId: tags[13].id }, // Kubernetes
    }),
    prisma.resource.create({
      data: {
        projectId: project3.id,
        type: "REPOSITORY",
        title: "GitHub Repository",
        url: "https://github.com/jorgemarles/devops-cli",
        order: 1,
      },
    }),
    prisma.resource.create({
      data: {
        projectId: project3.id,
        type: "DOCUMENT",
        title: "Installation Guide",
        content: `# Installation

Install via pip:

\`\`\`bash
pip install ops-cli
\`\`\`

Or download binary from releases page.`,
        order: 2,
      },
    }),
  ]);

  const project4 = await prisma.project.create({
    data: {
      title: "API Gateway with GraphQL Federation",
      slug: "graphql-gateway",
      name: "graphql-api-gateway",
      description: `# API Gateway with GraphQL Federation

A unified API gateway that federates multiple GraphQL microservices into a single endpoint with intelligent query optimization.

## Features

- **Schema Stitching**: Combines schemas from multiple services
- **Query Planning**: Optimizes distributed queries
- **Caching Layer**: Redis-based caching with intelligent invalidation
- **Rate Limiting**: Per-user and per-operation limits

## Performance

- Average response time: 45ms
- Handles 10k+ requests per second
- 95% cache hit rate for common queries`,
      status: ProjectStatus.COMPLETED,
      featured: false,
      githubUrl: "https://github.com/jorgemarles/graphql-gateway",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project4.id, tagId: tags[0].id }, // TypeScript
    }),
    prisma.projectTag.create({
      data: { projectId: project4.id, tagId: tags[5].id }, // NestJS
    }),
    prisma.projectTag.create({
      data: { projectId: project4.id, tagId: tags[10].id }, // Redis
    }),
    prisma.projectTag.create({
      data: { projectId: project4.id, tagId: tags[15].id }, // GraphQL
    }),
    prisma.resource.create({
      data: {
        projectId: project4.id,
        type: "REPOSITORY",
        title: "Source Code",
        url: "https://github.com/jorgemarles/graphql-gateway",
        order: 1,
      },
    }),
  ]);

  const project5 = await prisma.project.create({
    data: {
      title: "Task Management SaaS",
      slug: "task-management-saas",
      name: "taskflow",
      description: `# TaskFlow - Project Management Platform

A modern project management SaaS with kanban boards, gantt charts, and team collaboration features.

## Key Features

- Drag-and-drop kanban boards
- Gantt chart timeline view
- Team workload balancing
- Automated task assignments
- Integration with Slack, GitHub, and Jira

## Tech Stack

Built with Next.js 14, Prisma, PostgreSQL, and Tailwind CSS. Deployed on Vercel with edge functions.`,
      status: ProjectStatus.IN_PROGRESS,
      featured: false,
      githubUrl: "https://github.com/jorgemarles/taskflow",
      demoUrl: "https://taskflow-demo.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project5.id, tagId: tags[0].id }, // TypeScript
    }),
    prisma.projectTag.create({
      data: { projectId: project5.id, tagId: tags[4].id }, // Next.js
    }),
    prisma.projectTag.create({
      data: { projectId: project5.id, tagId: tags[8].id }, // PostgreSQL
    }),
    prisma.projectTag.create({
      data: { projectId: project5.id, tagId: tags[14].id }, // Prisma
    }),
    prisma.resource.create({
      data: {
        projectId: project5.id,
        type: "REPOSITORY",
        title: "GitHub Repository",
        url: "https://github.com/jorgemarles/taskflow",
        order: 1,
      },
    }),
    prisma.resource.create({
      data: {
        projectId: project5.id,
        type: "LINK",
        title: "Demo Site",
        url: "https://taskflow-demo.vercel.app",
        order: 2,
      },
    }),
  ]);

  const project6 = await prisma.project.create({
    data: {
      title: "Serverless Image Processing Pipeline",
      slug: "image-processing-pipeline",
      name: "image-pipeline",
      description: `# Serverless Image Processing Pipeline

An event-driven image processing system that automatically optimizes, resizes, and transforms images uploaded to S3.

## Pipeline Stages

1. **Upload**: Images uploaded to S3 trigger Lambda
2. **Process**: Sharp library performs transformations
3. **Store**: Optimized images saved to CDN bucket
4. **Notify**: SNS notification to subscribers

## Transformations

- WebP conversion for modern browsers
- Responsive image generation (multiple sizes)
- Metadata extraction and storage
- Face detection and cropping`,
      status: ProjectStatus.COMPLETED,
      featured: false,
      githubUrl: "https://github.com/jorgemarles/image-pipeline",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    },
  });

  await prisma.$transaction([
    prisma.projectTag.create({
      data: { projectId: project6.id, tagId: tags[3].id }, // JavaScript
    }),
    prisma.projectTag.create({
      data: { projectId: project6.id, tagId: tags[12].id }, // AWS
    }),
    prisma.resource.create({
      data: {
        projectId: project6.id,
        type: "REPOSITORY",
        title: "Source Code",
        url: "https://github.com/jorgemarles/image-pipeline",
        order: 1,
      },
    }),
    prisma.resource.create({
      data: {
        projectId: project6.id,
        type: "DOCUMENT",
        title: "Architecture Overview",
        content: `# Architecture

The pipeline uses AWS Lambda for compute, S3 for storage, and CloudFront for CDN distribution.

## Cost Efficiency

Processing 1M images/month costs approximately $15 with Lambda's pay-per-execution model.`,
        order: 2,
      },
    }),
  ]);

  console.log("✅ Seed completed successfully!");
  console.log(`Created 6 projects with ${tags.length} tags`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
