const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immobilien: [],
      copycheck: false,
      input: 0,
      id: 0,
    };
  },
  methods: {
    async getImmos() {
      try {
        const { data } = await axios.get('http://localhost:3000/immos');
        this.immobilien = data;
      } catch (error) {
        console.log(error);
      }
    },
    showInEuros(preis) {
      let p = preis.toLocaleString('de-AT', {
        style: 'currency',
        currency: 'EUR',
      });
      return p;
    },
    async delImmo(id) {
      await axios.delete(`http://localhost:3000/immos/${id}`);
      this.getImmos();
    },
    copyCheck(id) {
      if (this.copycheck === false) {
        this.copycheck = true;
      }
      const immo = this.immobilien.find((el) => el.id === id);
      this.input = immo.price;
      this.id = id;
    },
    async change() {
      // ohne Patch
      // const immo = this.immobilien.find((el) => el.id === this.id);
      // immo.price = this.showInEuros(Number(this.input));

      // mit Patch
      await axios.patch(`http://localhost:3000/immos/${this.id}`, {
        price: Number(this.input),
      });

      this.getImmos();
    },
  },
};

createApp(myApp).mount('#app');
