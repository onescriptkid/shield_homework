FROM mhart/alpine-node:9.4

WORKDIR /app
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm install --production
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "serve"]
