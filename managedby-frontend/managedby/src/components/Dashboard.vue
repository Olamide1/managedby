<template>
    <div>
        <h4>Welcome {{firstname}}</h4>
    </div>
</template>
<script>
export default {
    name: 'dashboard',
    data(){
        return {
            firstname: sessionStorage.getItem('firstname')
        }
    },
    methods: {
        
    }
}
</script>
<style>

</style>