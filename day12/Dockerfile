FROM debian:bullseye-slim 
WORKDIR /app

RUN apt-get update && apt-get install -y curl unzip
RUN curl https://bun.sh/install | bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

COPY package.json bun.lockb tsconfig.json ./
RUN bun install

COPY input.txt puzzle.ts index.ts ./
CMD bun index.ts