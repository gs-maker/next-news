import Head from "next/head";
import styles from "../../styles/Feed.module.css";
import Toolbar from "../../components/toolbar";
import { useRouter } from "next/router";

function Feed({ articles, pageNumber }) {
	const router = useRouter();
	return articles.length ? (
		<>
			<Head>
				<meta property="og:image" content={articles[0]?.urlToImage} />
				<meta property="og:description" content={articles[0]?.description} />
				<meta property="og:title" content={articles[0]?.title + " and more!"} />
			</Head>
            
			<div className="page-container">
				<Toolbar />
				<div className={styles.main}>
					{articles.map((article, index) => {
						return (
							<div key={index} className={styles.post}>
								<h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
								<p>{article.description}</p>
								{!!article.urlToImage && <img src={article.urlToImage} />}
							</div>
						);
					})}
				</div>

				<div className={styles.paginator}>
					<div
						onClick={() => {
							if (pageNumber > 1) {
								router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
							}
						}}
						className={pageNumber === 1 ? styles.disabled : styles.active}
					>
						Previous Page
					</div>
					<div>#{pageNumber}</div>
					<div
						onClick={() => {
							if (pageNumber < 5) {
								router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
							}
						}}
						className={pageNumber === 5 ? styles.disabled : styles.active}
					>
						Next Page
					</div>
				</div>
			</div>
		</>
	) : (
		<div className="page-container">
			<Toolbar />
			<div className={styles.main}>
				<h1>Oops! No articles for this page</h1>
			</div>
		</div>
	);
}

export const getServerSideProps = async (pageContext) => {
	const pageNumber = pageContext.query.slug;
	if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
		return {
			props: [],
			pageNumber: 1,
		};
	}

	const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`, {
		headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}` },
	});
	const news = await response.json();
	const { articles } = news;

	return {
		props: {
			articles,
			pageNumber: Number.parseInt(pageNumber),
		},
	};
};

export default Feed;
