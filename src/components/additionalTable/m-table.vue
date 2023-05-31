<template>
  <div>
    <b-table
        hover
        :items="productsSubItems"
        :fields="fields"
        responsive="sm"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        class="product"
    >
      <template v-slot:cell(actions)="{ item }" >
        <div class="d-flex align-items-center justify-content-center">
          <button
              type="button"
              class="btn btn-success me-2"
              @click="edit(item)"
          >
            Edit
          </button>
          <button
              type="button"
              class="btn btn-danger"
              @click="del(item)"
          >
            Del
          </button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "m-table",

  props: {
    productsSubItems: {
      type: Array
    }
  },

  data() {
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'material',
          sortable: true,
        },
        {
          key: 'type',
          sortable: true,
        },
        {
          key: 'selected',
          sortable: true,
        },
        {
          key: 'selectDate',
          sortable: true,
        },
        {
          key: 'quantity',
          sortable: true,
        },
        {
          key: 'byDefaultColor',
          sortable: true,
        },
        {
          key: 'actions',
        },
      ],
      isOpenM2: false,
      selectedProducts: {},
      editSubForm: [],

    }
  },

  created() {
    let employee = localStorage.getItem('employee')


    if (employee) {
      employee =  JSON.parse(employee)

      for (let i = 0; i < employee.length; i++) {

        if (this.selectedId === employee[i].id) {
          this.editSubForm = employee[i].subForm
        }

      }

    }

    console.log('products', this.products)
  },

  methods: {
    handleAdd(form) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === form.id) {
          this.products[i].name = form.name
          this.products[i].type = form.type
          this.products[i].material = form.material
          this.products[i].size = form.size
          this.products[i].date = form.date
          this.products[i].color = form.color
          this.products[i].quantity = form.quantity
        }
      }
    },

    edit(item) {
      this.$emit('editSubItem', item)
      this.isOpenM2 = true;
    },

    del(item) {
      this.$emit('deleteSubItem', item)
    },

    closeM2() {
      this.isOpenM2 = false
    }
  }
}
</script>