<template>
    <div class="outer">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
      <div class="inner"></div>
    </div>
</template>

<script>
export default {
  name: 'pointer'
}
</script>

<style lang="scss" scoped>
$color: #946c74;
.outer{
  width: .52rem;
  height: .52rem;
  border-radius: 50%;
  border: 1px solid $color;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .circle{
    box-sizing:content-box ;
    position: absolute;
    top: -.05rem;
    left: -.05rem;
    height: .50rem;
    width: .50rem;
    border: 2px solid $color;
    box-shadow: 0 0 .12rem $color, 0 0 .20rem $color inset;
    animation: warn 2s ease-out both;
    animation-iteration-count: infinite;
    border-radius: 50%;
  }
  .inner{
    top:0;
    left:0;
    background: $color;
    height: .25rem;
    width: .25rem;
    border-radius: 50%;
  }
  .circle1{
    animation-delay: 2s;
  }

  .circle2{
    animation-delay: 1.6s;
  }

  .circle3{
    animation-delay: 1.2s;
  }
  @keyframes warn {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
}
</style>
