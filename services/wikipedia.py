from wikiapi import WikiApi


def wiki_article(title):
    wiki = WikiApi()
    article = wiki.get_article(title)

    if article.summary:
        res = article.summary
    else:
        res = """
            Sorry, The wikipedia entry for the given entry could not be found.
            Please verify that you have entered a valid place with
            correct spellings.
            """
    return res
