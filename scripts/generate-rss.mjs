import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allBlogs } from '.contentlayer/data';

const DOMAIN = process.env.DOMAIN || 'willin.wang';

async function generate() {
  const feed = new RSS({
    title: 'Lee Robinson',
    site_url: `https://${DOMAIN}`,
    feed_url: `https://${DOMAIN}/feed.xml`
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `https://${DOMAIN}/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
