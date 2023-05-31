<template>
  <div id="app">
    <div class="wrapper">

      <bg-video />

      <Modal
          :id="this.chosenItemID"
          v-if="isOpen"
          @closeMe="closeModal"
      />

      <div class="container">

        <div class="text-center mt-5 mb-5 text-secondary h2 text-uppercase">
          list of Employers to Google
        </div>

        <div class="apper">

          <header class="mb-3">
            <button class="btn btn-success" @click="newItem" >Add</button>
          </header>

          <b-table
              hover
              :items="AllEmployers"
              :fields="fields"
              responsive="sm"
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              class="apper__item text-white"
          >
            <template v-slot:cell(actions)="{ item }" >
              <div class="d-flex align-items-center justify-content-center">
                <button
                    type="button"
                    class="btn btn-success me-2"
                    @click="editItem(item)"
                >
                  Edit
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteItem(item)"
                >
                  Del
                </button>
              </div>
            </template>
          </b-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import BgVideo from "@/components/bgVideo";
import Modal from "@/components/actionModals";
export default {
  name: 'App',
  components: {BgVideo, Modal},
  data() {
    return {
      fields: [
        { key: 'last_name', sortable: true},
        { key: 'name', sortable: true},
        { key: 'age', sortable: true },
        { key: 'last_work_place', sortable: true},
        { key: 'actions'},
      ],
      chosenItemID: null,
      AllEmployers: this.$store.state.employers,
      isOpen: false,
      employersForm: [
        {
          id: 1,
          name: '',
          last_name: '',
          age: '',
          last_work_place: '',
          subForm: [
            {
              id: 1,
              name: '',
              type: '',
              material: '',
              average: 1,
              date: ''
            },
          ]
        },
      ]
    }
  },
  methods: {
    newItem() {
      this.chosenItemID = null
      this.isOpen = true
    },

    editItem(item) {
      this.chosenItemID = item.id
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
      this.AllEmployers = this.$store.state.employers
    },
    deleteItem(item) {
      const newEmployers = this.$store.state.employers.filter( function(obj) {return obj.id !== item.id})
      this.$store.dispatch('refreshEmployers', newEmployers)
      this.AllEmployers = this.$store.state.employers
    }
  }
}
</script>

<style>

</style>
