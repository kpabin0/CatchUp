// This file contain the fallback methods with data incase of fetch failure


export function getFallbackNews()
{
    const newsCount = 5
    const tempNews = Array(newsCount).fill(0).map((_, index) => index + 1)
    return tempNews.map((val) => {
        return {
        title: "Fallback News Title : " + val.toString(),
        description: "This is the place for description of news..... " + val.toString() 
        }
    })
}

export function getFallbackSubNews()
{
    const subNewsCount = 10
    const tempSubNews = Array(subNewsCount).fill(0).map((_, index) => index + 1)
    return tempSubNews.map((val) => {
        return {
        title: "Fallback Sub News Title : " + val.toString(),
        url: "#",
        description: "This is short sub news desc..... just some text to fill the place" + val.toString() 
        }
    })
}