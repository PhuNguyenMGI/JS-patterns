interface StockMarketDataSource {
  getStockPrice(symbol: string): number
}

class BasicStockMarketDataSource implements StockMarketDataSource {
  getStockPrice(symbol: string): number {
    // Implementation to fetch stock price from a data source
    return 0
  }
}

class StockMarketDecorator implements StockMarketDataSource {
  constructor(protected dataSource: StockMarketDataSource) {}

  getStockPrice(symbol: string): number {
    // Additional functionality to be added to the getStockPrice method
    return this.dataSource.getStockPrice(symbol)
  }
}

class LoggingDecorator extends StockMarketDecorator {
  getStockPrice(symbol: string): number {
    // Log the request before fetching the stock price
    console.log(`Fetching stock price for symbol: ${symbol}`)
    return super.getStockPrice(symbol)
  }
}

class CachingDecorator extends StockMarketDecorator {
  private cache: { [symbol: string]: number } = {}

  getStockPrice(symbol: string): number {
    // Check if the stock price is already available in the cache
    if (symbol in this.cache) {
      console.log(`Retrieving stock price for symbol: ${symbol} from cache`)
      return this.cache[symbol]
    }

    // Fetch the stock price from the data source if not available in cache
    const price = super.getStockPrice(symbol)
    this.cache[symbol] = price
    return price
  }
}

// Usage
const dataSource: StockMarketDataSource = new BasicStockMarketDataSource()
const decoratedDataSource: StockMarketDataSource = new CachingDecorator(
  new LoggingDecorator(dataSource)
)

const stockPrice = decoratedDataSource.getStockPrice('AAPL')
