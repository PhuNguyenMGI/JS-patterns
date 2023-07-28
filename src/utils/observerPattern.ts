interface Observer {
  update(symbol: string, price: number): void
}

class StockMarket {
  private stockPrices: { [symbol: string]: number } = {}
  private observers: Observer[] = []

  addObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  setStockPrice(symbol: string, price: number): void {
    this.stockPrices[symbol] = price
    this.notifyObservers(symbol, price)
  }

  private notifyObservers(symbol: string, price: number): void {
    this.observers.forEach((observer) => {
      observer.update(symbol, price)
    })
  }
}

class StockMarketObserver implements Observer {
  constructor(private name: string) {}

  update(symbol: string, price: number): void {
    console.log(`${this.name} received update for symbol ${symbol}: ${price}`)
  }
}

// Usage
const stockMarket = new StockMarket()

const observer1 = new StockMarketObserver('Observer 1')
const observer2 = new StockMarketObserver('Observer 2')

stockMarket.addObserver(observer1)
stockMarket.addObserver(observer2)

stockMarket.setStockPrice('AAPL', 150.25)
stockMarket.setStockPrice('GOOGL', 2500.75)

stockMarket.removeObserver(observer2)

stockMarket.setStockPrice('TSLA', 700.5)
