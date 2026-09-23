function page() {
    //creating
    class Node {
        value: number;
        next: Node | null

        constructor(value: number) {
            this.value = value
            this.next = null
        }


    }
    // const first = new Node(5);
    // const second = new Node(10);
    // const third = new Node(15);
    // const newNode = new Node(7)
    // const newHead = new Node(1)
    // const last = new Node(25)
    // newHead.next = first
    // first.next = newNode;
    // newNode.next = second
    // second.next = third

    // const head = newHead
    // let current = head


    // while (current != null) {

    //     console.log(current.value);
    //     if (current.next === null) {
    //         current.next = last
    //         break

    //     }
    //     current = current.next


    // }

    class LinkedList {

        head: Node | null

        constructor() {
            this.head = null
        }
        inseartAtHead(value: number) {
            const newNode = new Node(value)
            if (this.head === null) {
                this.head = newNode
            } else {
                newNode.next = this.head
                this.head = newNode
            }
        }
        insertAtEnd(value: number) {
            const newNode = new Node(value)
            if (this.head === null) {
                this.head = newNode
                return
            }

            let current = this.head
            while (current.next !== null) {
                current = current.next
            }
            current.next = newNode
        }
        delete(value: number) {
            const newNode = new Node(value)
            if (this.head === null) {
                return
            }
            if (this.head.value === value) {
                this.head = this.head.next
                return
            }
            let current = this.head
            while (current.next != null && current.next.value != value) {
                current = current.next

            }
            if (current.next != null) {
                current.next = current.next.next

            }
        }
        find(value: number) {
            let current = this.head
            while (current != null) {
                if (current.value === value) {
                    return true

                }

                current = current.next
            }
            return false



        }
        insertAtPosition(value: number, position: number) {
            if (position<0) {
                return 
                
            }
            if (position ===0) {
                this.inseartAtHead(value)
                
            }

            const newNode = new Node(value)
            let current = this.head
            let index = 0
            while (current !=null && index < position -1)  {
                current = current.next
                index ++
            }
            if (current === null) return;
            newNode.next = current.next
            current.next = newNode

            

        }

    }
    const list = new LinkedList()
    list.inseartAtHead(5)
    list.inseartAtHead(10)
    list.inseartAtHead(15)
    list.inseartAtHead(20)
    list.insertAtEnd(25)
    list.delete(15)
    list.insertAtPosition(12, 2)

}
export default page