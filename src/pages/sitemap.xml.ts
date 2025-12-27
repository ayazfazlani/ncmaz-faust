import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'

export default function Sitemap() {
	return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')

	try {
		if (fs.existsSync(sitemapPath)) {
			const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
			res.setHeader('Content-Type', 'application/xml')
			res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
			res.write(sitemapContent)
			res.end()
			return { props: {} }
		} else {
			res.statusCode = 404
			res.end()
			return { props: {} }
		}
	} catch (error) {
		console.error('Error reading sitemap:', error)
		res.statusCode = 500
		res.end()
		return { props: {} }
	}
}

