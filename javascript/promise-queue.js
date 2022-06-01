// source: https://www.linkedin.com/learning/advanced-node-js/concurrent-tasks?u=76264346
module.exports = class PromiseQueue {

    constructor(promises = [], concurrentCount = 1){
        this.concurrent = concurrentCount || 1;
        this.todo = promises || [];
        this.total = this.todo.length;
        this.running = [];
        this.completed = [];
    }

    get runAnother(){
        return (this.running.length < this.concurrent.length) && this.todo.length;
    }

    run(){
        while (this.runAnother){
            const promise = this.todo.shift();
            promise
                .then(() => {
                    this.completed.push(this.running.shift());
                    this.run();
                }, (error) => {
                    console.error(error.message)
                })

            this.running.push(promise)
        }

    }
}
