import { computed, defineComponent } from 'vue'
import './index.styl'
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => `svg-icon ${props.className}`)

    return () => (
      <svg
        class={svgClass.value}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use xlinkHref={iconName.value} />
      </svg>
    )
  }
})
