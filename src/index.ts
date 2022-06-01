import { DataSource } from "typeorm";
import { User, Post } from './entity';

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./test.sqlite",
  entities: [User, Post],
});

async function main() {

  const datasource = await AppDataSource.initialize();
  const sql = datasource.getRepository(User)
    .createQueryBuilder('u')
    .leftJoin(Post, 'p', 'p.uid = u.id')
    .skip(10)
    .take(20)
    .getSql();
  console.log(sql);

}

main().catch(console.error);

console.log('finish...');
