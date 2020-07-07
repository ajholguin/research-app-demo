my_model <- function(x) {
    # simple linear function + random noise
    return(2*x + 1 + rnorm(1))
}

lambda_handler <- function(...) {
    
    args <- list(...)
    y <- my_model(as.integer(args[['pathParameters']][['x']]))

    return(list(
        statusCode = 200,
        headers = list(
            `Access-Control-Allow-Headers` = "Content-Type",
            `Access-Control-Allow-Origin` = "*",
            `Access-Control-Allow-Methods` = "GET"
        ),
        body = jsonlite::toJSON(list(
            model_output = y
        ), auto_unbox = TRUE),
        isBase64Encoded = FALSE
    ))
}
