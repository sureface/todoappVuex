<template>
  <div>
    <m-modal
        @closeM2="closeM2"
        @add-subItem="newSubItem"
        @edit-subItem="editChosenSubItem"
        v-if="isOpenM2"
        :editingSubItem="editingSubItem"
        :subItemsID="lastIndex"
    />

    <div class="action__modals" @click.stop="close_modal">
      <div class="action__modals-card" @click.stop>
        <div class="card__wrapper">
          <div class="card__wrapper_close" @click.stop="close_modal">
            <div @click.stop="close_modal">X</div>
          </div>
          <div class="text-center text-secondary text-lg">
            Please Add New Employers
          </div>
          <form ref="form"  class="mb-3">
            <b-form-group
                label="Name"
                label-for="name-input"
                invalid-feedback="Name is required"
                :state="nameState"
                class="mb-2"
            >
              <b-form-input
                  id="name-input"
                  v-model="employers.name"
                  :state="nameState"
                  required
                  class="shadow-none"
              ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Last Name"
                label-for="Lname-input"
                invalid-feedback="Last Name is required"
                :state="nameState"
                class="mb-2"
            >
              <b-form-input
                  id="Lname-input"
                  v-model="employers.last_name"
                  :state="nameState"
                  required
                  class="shadow-none"
              ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Age"
                label-for="age-input"
                invalid-feedback="Age is required"
                :state="nameState"
                class="mb-2"
            >
              <b-form-input
                  id="age-input"
                  v-model="employers.age"
                  :state="nameState"
                  required
                  class="shadow-none"
              ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Last Work Place"
                label-for="last-work-input"
                invalid-feedback="Last Work Place is required"
                :state="nameState"
            >
              <b-form-input
                  id="last-work-input"
                  v-model="employers.last_work_place"
                  :state="nameState"
                  required
                  class="shadow-none"
              ></b-form-input>
            </b-form-group>
          </form>

          <div class="mt-5 mb-5">
            <hr>
          </div>

          <div>

            <div class="text-center text-secondary text-lg">
              Add New Product ! &nbsp; &nbsp; ( optional )
            </div>

            <button class="btn btn-success mb-3" @click="addingProduct">Add Product</button>

            <m-table
              v-if="isOpenM2 === false"
              :productsSubItems="employers.subForm"
              @editSubItem="editSubItem"
              @deleteSubItem="deleteChosenSubItem"
            />

          </div>

          <div class="d-flex align-items-center justify-content-end mt-4">
            <button v-if="adding" type="button" class="btn btn-success" @click="addEmployer" >Add Now</button>
            <button v-else type="button" class="btn btn-success" @click="editEmployer" >Save changes</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mTable from './additionalTable/m-table';
import mModal from './additionalTable/m-modal';

export default {
  name: "actionModals",
  props: {
    id: {
      type: Number
    }
  },
  components: {
    mTable,mModal
  },
  data() {
    return {
      reRendering: true,

      lastIndex: 0,

      nameState: null,
      isOpenM2: false,
      adding: true,
      employers: {
        id: null,
        name: '',
        last_name: '',
        age: '',
        last_work_place: '',
        subForm: []
      },
      editingSubItem: ''
    }
  },
  methods: {
    addEmployer() {
      this.$store.dispatch('addProduct', this.employers)
      this.$emit('closeMe')
    },

    editEmployer() {
      this.$store.dispatch('editProduct', this.employers)
      this.$emit('closeMe')
    },

    editSubItem(subItem) {
      this.editingSubItem = subItem
      this.isOpenM2 = true
    },

    newSubItem(subItem) {
      this.employers.subForm.push(subItem)
    },

    editChosenSubItem(subItem) {
      const index = this.employers.subForm.findIndex(item => item.id === subItem.id)
      this.employers.subForm[index] = subItem
    },

    deleteChosenSubItem(chosenItem) {
      const newSubItems = this.employers.subForm.filter( function(item) {return item.id !== chosenItem.id})
      this.employers.subForm = newSubItems
    },

    addingProduct() {
      this.editingSubItem = ''
      this.lastIndex = this.employers.subForm.length + 1
      this.isOpenM2 = true
    },

    closeM2() {
      this.isOpenM2 = false
    },

    close_modal() {
      this.$emit('closeMe')
    }
  },

  mounted() {
    if (this.id !== '' && this.id !== null && this.id !== undefined) {
      this.employers = this.$store.state.employers.find(employer => employer.id === this.id)
      this.adding = false
    }
    else {
      this.employers = {
        id: this.$store.state.employers.length + 1,
        name: '',
        last_name: '',
        age: '',
        last_work_place: '',
        subForm: []
      } 
    }
    console.log('yes', this.id);
  }
}
</script>