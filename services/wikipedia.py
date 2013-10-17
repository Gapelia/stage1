from wikiapi import WikiApi


def wiki_article(title):
    wiki = WikiApi()
    article = wiki.get_article(title)

    if article.summary:
        res = article.summary
    else:
        res = """
            Sorry, we couldn't find the wikipedia entry.
            Please verify that you have entered a valid
						place with correct spelling.
            """
    return res
