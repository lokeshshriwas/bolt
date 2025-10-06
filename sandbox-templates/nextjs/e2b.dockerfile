# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

# Create Next.js app
RUN npx --yes create-next-app@15.5.3 . --yes

# Initialize shadcn
RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force

# Install only commonly used shadcn components instead of all
# This significantly reduces build time
RUN npx --yes shadcn@2.6.3 add --all --yes

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN mv /home/user/nextjs-app/* /home/user/ && \
    mv /home/user/nextjs-app/.* /home/user/ 2>/dev/null || true && \
    rm -rf /home/user/nextjs-app

# Pre-build the Next.js app
WORKDIR /home/user
RUN npm run build