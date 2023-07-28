<template>
  <main>
    <div></div>
  </main>
</template>

<script setup lang="ts">
import { useThresholdStore } from '@/stores/useThreshold' //Module pattern
import { storeToRefs } from 'pinia'

const useThreshold = useThresholdStore()
const { threshold } = storeToRefs(useThreshold)
//Revealing module pattern
const predictBestTimeToSell = (shares: Array<number>) => {
  const privateFunction = () => {
    for (const share of shares) {
      if (share >= threshold.value) {
        return share // Return the index when the share price exceeds the threshold
      }
    }
    return -1
  }

  const publicFunction = () => {
    if (shares.length === 0) {
      return -1
    } else {
      return 'Best time to sell is ' + privateFunction()
    }
  }
  return {
    publicFunction: publicFunction
  }
}

const onGetBestTimeToSell = () => {
  return predictBestTimeToSell([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ]).publicFunction()
}

// Create a prototype for stock objects
const stockPrototype = {
  symbol: '',
  price: 0,
  getStockInfo() {
    return `Stock: ${this.symbol}, Price: ${this.price}`;
  },
  clone() {
    const clonedStock = Object.create(this);
    return clonedStock;
  }
};

// Create a specific stock object based on the prototype
const appleStock = stockPrototype.clone();
appleStock.symbol = 'AAPL';
appleStock.price = 150.25;
console.log(appleStock.getStockInfo()); // Output: "Stock: AAPL, Price: 150.25"

// Create another stock object based on the prototype
const googleStock = stockPrototype.clone();
googleStock.symbol = 'GOOGL';
googleStock.price = 2800.50;
console.log(googleStock.getStockInfo()); // Output: "Stock: GOOGL, Price: 2800.50"

const createUser = ({ firstName = '', lastName = '', email = '' }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
})

const user1 = createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'D8bOe@example.com'
})
</script>
