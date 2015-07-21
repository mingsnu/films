library(XML)

dat = paste0(readLines("index.html"), collapse = "")

doc = xmlParse(dat, isHTML = TRUE)
## filmNames = xpathApply(doc, path="//div[@class='list']/a/p")
filmNodes = xpathApply(doc, path="//a/p")
filmNamesScores = sapply(filmNodes, xmlValue, trim=TRUE)
head(filmNamesScores)
f1 <- function(x){
    tmp = strsplit(x, split = " ")[[1]]
    c(tmp[1], tmp[length(tmp)])
}
tmp = lapply(filmNamesScores, f1)
filmDf = as.data.frame(do.call(rbind, tmp))
names(filmDf) = c("Name", "Score")
filmDf$Status = ""

write.csv(filmDf, "filmList.csv", quote = FALSE, row.names=FALSE)
