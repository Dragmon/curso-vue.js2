Vue.component('CoinDetail', {
  props: ['coin'],
  data() {
    return {
      showPrices: false,
      value: 0,
    };
  },

  computed: {
    title() {
      return `${this.coin.name} - ${this.coin.symbol}`;
    },

    convertedValue() {
      if (!this.value) {
        return 0;
      }

      return this.value / this.coin.price;
    },
  },

  methods: {
    toogleShowPrices() {
      this.showPrices = !this.showPrices;

      this.$emit('change-color', this.showPrices ? '536552' : '654782');
    },
  },
  template: `
    <div>
      <img
      v-on:mouseover='toogleShowPrices'
      v-on:mouseout='toogleShowPrices'
      v-bind:src='coin.img'
      v-bind:alt='coin.name'>

      <h1 v-bind:class="coin.changePercent > 0 ? 'green' :'red'">
        {{ title }}
        <span v-if='coin.changePercent > 0'>👍</span>
        <span v-else-if='coin.changePercent < 0'>👎</span>
        <span v-else>🤞</span>
        <button v-on:click='toogleShowPrices'>{{ showPrices ? 'Ocultar precios' : 'Ver precios' }}</button>
      </h1>

      <input type='number' v-model='value'>
      <span>{{convertedValue}}</span>

      <ul v-show=showPrices>
        <li
          class='uppercase'
          v-bind:class="{orange: data.value === coin.price, red: data.value < coin.price, green: data.value > coin.price}"
          v-for='(data, index) in coin.pricesWithDays'
          v-bind:key='data.day'>
          {{ index }} - {{ data.day }} - {{data.value}}
        </li>
      </ul>
    </div>
  `,
});

new Vue({
  el: '#app',

  data() {
    return {
      btc: {
        name: 'Bitcoin',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 0,
        symbol: 'BTC',
        price: 8400,
        prices: [8400, 7900, 8200, 9000, 9400, 10000, 10200],
        info: [123, 456, 789, 101112, 131415, 161718, 192021],
        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miercoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sabado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ],
      },
      color: 'a1c3e6',
    };
  },

  /* watch: {
    showPrices(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  }, */

  methods: {
    updateColor(color) {
      this.color = color || this.color.split('').reverse().join('');
    },
  },
});
