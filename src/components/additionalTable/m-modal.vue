<template>
  <div class="action__modals m__modal" @click="$emit('closeM2', $event)">
    <div class="action__modals-card" @click.stop>
      <div class="card__wrapper">
        <div class="card__wrapper_close m__close" @click="$emit('closeM2', $event)">
          <div>X</div>
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
                v-model="name"
                :state="nameState"
                required
                class="shadow-none"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              label="Type"
              label-for="type-input"
              invalid-feedback="type is required"
              :state="nameState"
              class="mb-2"
          >
            <b-form-input
                id="type-input"
                v-model="type"
                :state="nameState"
                required
                class="shadow-none"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              label="Material"
              label-for="material-input"
              invalid-feedback="Material is required"
              :state="nameState"
              class="mb-2"
          >
            <b-form-input
                id="material-input"
                v-model="material"
                :state="nameState"
                required
                class="shadow-none"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="Size"
              label-for="size"
              invalid-feedback="Size is required"
              :state="nameState"
              class="mt-2 mb-2"
          >
            <b-form-select
                v-model="selected"
                :options="options"
                class="px-2 py-2 border border-secondary rounded-3 w-100"
                id="size"
            >
            </b-form-select>
          </b-form-group>

          <hr class="my-4">

          <div class="d-flex align-items-center justify-content-between">
            <div>
              <b-form-group label-for="datepicker" label="Deliver Date">
                <b-form-datepicker id="datepicker" v-model="selectDate" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </div>
            <div>
              <b-form-group label-for="demo-sb" label="Choose Quantity">
                <b-form-spinbutton id="demo-sb" v-model="quantity" min="1" max="100"></b-form-spinbutton>
              </b-form-group>
            </div>
            <div>
              <b-form-group label="Color" label-for="chooseColor" class="mb-2">
                <b-form-radio-group
                    v-model="byDefaultColor"
                    :options="ChooseColor"
                    class="d-flex align-items-center gap-3"
                    value-field="item"
                    text-field="name"
                    id="chooseColor"
                ></b-form-radio-group>
              </b-form-group>
            </div>
          </div>

        </form>
        <div class="d-flex align-items-center justify-content-end mb-4">
          <button v-if="adding === true" type="button" class="btn btn-success"  @click="addSubItem">Add</button>
          <button v-else type="button" class="btn btn-success"  @click="editSubItem">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "m-modal",

  props: {
    editingSubItem: {
      type: [Object, String]
    },

    subItemsID: {
      type: Number
    }
  },

  data() {
    return {
      adding: true,
      nameState: null,

      id: null,
      name: '',
      type: '',
      material: '',
      selected: 'default',
      selectDate: '',
      byDefaultColor: 'Black',
      quantity: 1,

      options: [
        { value: 'default', text: 'Please select the Size', disabled: true },
        { value: '900x656', text: '900x656' },
        { value: '1024x856', text: '1024x856' },
        { value: '1110x900', text: '1110x900' },
        { value: '1200x986', text: '1200x986' },
      ],

      ChooseColor: [
        { item: 'Black', name: 'Black' },
        { item: 'White', name: 'White' },
        { item: 'Blue', name: 'Blue' },
      ],
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },

    resetModal() {
      this.nameState = null;

      this.id = null,
      this.name = '',
      this.type = '',
      this.material = '',
      this.selected = 'default',
      this.selectDate = '',
      this.byDefaultColor = 'Black',
      this.quantity = 1
    },

    addSubItem() {
      if (!this.checkFormValidity()) {
        return
      }
      const subItem = {
        id: this.id,
        name: this.name,
        type: this.type,
        material: this.material,
        selected: this.selected,
        selectDate: this.selectDate,
        byDefaultColor: this.byDefaultColor,
        quantity: this.quantity,

      }
      this.$emit('add-subItem', subItem)
      this.resetModal()
      this.$emit('closeM2')
    },

    editSubItem() {
      const subItem = {
        id: this.id,
        name: this.name,
        type: this.type,
        material: this.material,
        selected: this.selected,
        selectDate: this.selectDate,
        byDefaultColor: this.byDefaultColor,
        quantity: this.quantity,

      }
      this.$emit('edit-subItem', subItem)
      this.resetModal()
      this.$emit('closeM2')
      console.log(subItem);
    },

    currentValSize() {
      const val = this.options.find(option => option.value === this.selected);
      return val.text
    },

    currentValColor() {
      const val = this.ChooseColor.find(option => option.item === this.byDefaultColor);
      return val.name
    }
  },

  mounted() {
    console.log(this.editingSubItem);
    if (this.editingSubItem === '' || this.editingSubItem === {} || this.editingSubItem === undefined || this.editingSubItem === null) {
      console.log(this.subItemsID);
      this.id = this.subItemsID
    }
    else  {
      this.adding = false
      this.subItem = this.editingSubItem
      this.id = this.editingSubItem.id,
      this.name = this.editingSubItem.name,
      this.type = this.editingSubItem.type,
      this.material = this.editingSubItem.material,
      this.selected = this.editingSubItem.selected,
      this.selectDate = this.editingSubItem.selectDate,
      this.byDefaultColor = this.editingSubItem.byDefaultColor,
      this.quantity=  this.editingSubItem.quantity
    }
  }
}
</script>