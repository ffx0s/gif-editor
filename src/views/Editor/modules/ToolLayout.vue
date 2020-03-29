<template>
<div class="editor-tool-layout" :class="{'show-tool': show}">
  <slot></slot>
  <div class="footer item-center">
    <IconButton @click.native="$emit('on-restore')" class="close" icon-class="icon-close" />
    <div class="item-center" style="width: 100%">
      <div class="action-item item-center">
        <div class="choose-type" @click="showHelp">
          全局
          <i class="iconfont icon-help"></i>
        </div>
        <InputSwitch v-model="type" @input="$emit('on-global-frame', type)" />
      </div>
      <div class="action-item item-center" v-if="enabledRecord">
        <IconButton class="record" icon-class="icon-undo" @click.native="undo" :disabled="disableUndo" />
        <IconButton class="record" icon-class="icon-redo" @click.native="redo" :disabled="disableRedo" />
      </div>
      <div class="action-item item-center">
        <slot name="action"></slot>
      </div>
    </div>
    <IconButton @click.native="$emit('on-save')" class="correct" icon-class="icon-ico-correct" />
  </div>
</div>
</template>

<script>
import editor from '@/editor/instance'
import { mapGetters } from 'vuex'
import InputSwitch from '@/components/Switch'

export default {
  props: {
    enabledRecord: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      type: true,
      disableUndo: true,
      disableRedo: true
    }
  },
  watch: {
    show(value) {
      if (!value) {
        this.type = true
      }
      this.$emit('on-show', value)
    }
  },
  computed: {
    ...mapGetters({
      currentAction: 'currentAction'
    }),
    show() {
      return this.currentAction === this.name
    }
  },
  mounted() {
    const vm = this
    editor.layer.history.on('input', history => {
      vm.disableUndo = history.disableUndo
      vm.disableRedo = history.disableRedo
    })
  },
  methods: {
    showHelp() {
      this.$modal('全局激活时，所有的帧都会应用当前编辑操作。')
    },
    undo() {
      editor.layer.history.undo(editor.layer)
    },
    redo() {
      editor.layer.history.redo(editor.layer)
    }
  },
  components: {
    InputSwitch
  }
}
</script>


<style lang="postcss" scoped>
.editor-tool-layout {
  position: absolute;
  padding-top: 18px;
  width: 100%;
  height: 100%;
  background-color: white;
  transform: translate3d(0, 100%, 0);
  transition: transform 0.3s ease;
  box-sizing: border-box;
  &.show-tool {
    transform: translate3d(0, 0, 0);
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  & >>> i {
    font-size: 18px;
  }
  & >>> .close,
  & >>> .correct {
    position: absolute;
    bottom: 0;
    height: 100%;
    color: var(--black);
  }
  & .close {
    left: 0;
  }
  & .correct {
    right: 0;
    color: var(--dark-blue);
  }
}

.action-item {
  margin: 0 10px;
  height: 100%;
  & .choose-type {
    height: 100%;
  }
  & .icon-help {
    margin-left: -4px;
    margin-right: 5px;
    font-size: 12px;
  }
}

.record {
  color: var(--black);
}
</style>

