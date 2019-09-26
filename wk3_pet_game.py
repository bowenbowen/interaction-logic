# importing "time" for time-related operations 
import time  
# for timer 
import threading
from threading import Thread


myPets = []
pet1 = {"name": "", "type": "", "feeling": 100, "energy": 100}


# ----------------- tool functions -----------------
def clamp(n, minn, maxn):
    return max(min(maxn, n), minn)  # https://stackoverflow.com/questions/5996881/how-to-limit-a-number-to-be-within-a-specified-range-python


# ----------------- main functions -----------------

# playerName = raw_input("Please tell me your name: ")
print " "     # a new line break for readability
print "--------------------------------------------"
print "Your allergic roommate just moved out today. "
print "You can finally get your own pets! "


def getNewPet():
    print " "     # a new line break for readability
    print "You walked into a pet shop, and decided to bring a _____ back home: "


    def petTypeChoice():
        print "Type '1' for a CAT"
        print "Type '2' for a HAMSTER"
        print "Type '3' for a PARROT"
        petTypeChoice = raw_input()
        if petTypeChoice == "1":
            pet1["type"] = "cat"
            print " "
            print "You've got a cat!"
       
        elif petTypeChoice == "2":
            pet1["type"] = "hamster"
            print " "
            print "You've got a hamster!"
        
        elif petTypeChoice == "3":
            pet1["type"] = "parrot"
            print " "
            print "You've got a parrot!"

        else:
            print " "
            print "Invalid Comment. Please make a proper choice."
            getNewPet()

    petTypeChoice()

    def namePet():
        print "Now give your pet a lovely name: "
        petName = raw_input()
        pet1["name"] = petName
        print " "     # a new line break for readability
        print "Now " + pet1["name"] + " is your buddy."
        time.sleep(1)  # delay 2 sec
    namePet()

getNewPet()



# https://stackoverflow.com/questions/35657681/python-functions-run-as-background-processes
# update the status of the pet(s). When certain point reached, trigger events
def statusUpdate():
    while True: 
    	if pet1["feeling"] >= 50:
            pet1["feeling"] -= 1
        pet1["energy"] -= 1  

        pet1["feeling"] = clamp(pet1["feeling"], 0, 100) # limit the status values within the 0-100 range.
        pet1["energy"] = clamp(pet1["feeling"], 0, 100)  # see top for the clamp() function 


        if pet1["feeling"] <= 70:
           print pet1["name"] + " hides under the couch and refuses to get out."
           time.sleep(2)  # delay 2 sec
        elif pet1["feeling"] <= 40:
            print "Crack! " + pet1["name"] + " broke your cup."
            time.sleep(2)  # delay 2 sec
        elif pet1["feeling"] <= 20:
            print pet1["name"] + " is making furious growls!"
            time.sleep(2)  # delay 2 sec

        if pet1["energy"] <= 60:
            print pet1["name"] + " seems to be moving slower than normal."
            time.sleep(2)  # delay 2 sec
        elif pet1["feeling"] <= 45:
            print pet1["name"] + " keeps checking her bowl."
            time.sleep(2)  # delay 2 sec
        elif pet1["feeling"] <= 30:
            print pet1["name"] + " refuses to move."
            time.sleep(2)  # delay 2 sec


        # monitor the status for debug use
        # print "feeling: " + str(pet1["feeling"])
        # print "energy: " + str(pet1["energy"])
        time.sleep(8)       # the status gets updated every 8 second

background_thread = Thread(target=statusUpdate, args=())
background_thread.start()




def interact():
    print " "
    print "----------------------------------------------"
    print "Choose what you want to do with " + pet1["name"] + " today."
    print "Type '1' to check " + pet1["name"] +"'s status"
    print "Type '2' to play with "+ pet1["name"]
    print "Type '3' to feed "+ pet1["name"]
    print "Type '4' to do nothing"
    interactionChoice = raw_input()

    if interactionChoice == "1":  # check status
    	print "------------------------"
        print pet1["type"] + " " + pet1["name"] + "'s status:"
        print "feeling: " + str(pet1["feeling"]) + "/100"
        print "energy: " + str(pet1["energy"]) + "/100"
        print "------------------------"
        time.sleep(2)  # delay 2 sec
        interact()
       
    elif interactionChoice == "2":  # play
        print " "
        print "Type '1' to pat " + pet1["name"]
        print "Type '2' to play a toy with " + pet1["name"]
        print "Type '3' to play a cat song to " + pet1["name"]
        playChoice = raw_input()
        if playChoice == "1":   # to pat
            pet1["feeling"] += 5
            print pet1["name"] + " seems to be enjoying it."
            time.sleep(2)  # delay 2 sec
        elif playChoice == "2":   # to play a toy
            pet1["feeling"] += 10
            pet1["energy"] -= 5
            print pet1["name"] + " seems interested in the toy (for 5 minutes)."
            time.sleep(2)  # delay 2 sec
        elif playChoice == "3":   # to play a cat song
            pet1["feeling"] += 3
            print pet1["name"] + " seems perplexed. Is there another cat in this room?"
            time.sleep(2)  # delay 2 sec
        interact()
        
    elif interactionChoice == "3":  # feed
        print " "
        print "Type '1' to feed " + pet1["name"] + " dry pet food"
        print "Type '2' to feed " + pet1["name"] + " grains"
        print "Type '3' to feed " + pet1["name"] + " veggies"
        print "Type '4' to feed " + pet1["name"] + " meat"
        feedChoice = raw_input()
        if feedChoice == "1":   # to feed dry cat food
            pet1["energy"] += 5
            pet1["feeling"] -= 3
            print pet1["name"] + " seems to be a bit reluctant to eat. But she eats it in the end."
            time.sleep(2)  # delay 2 sec
        elif feedChoice == "2":   # to feed fish
            pet1["energy"] += 8
            pet1["feeling"] += 5
            print pet1["name"] + " seems okay with it. "
            time.sleep(2)  # delay 2 sec
        elif feedChoice == "3":   # to feed veggies
            pet1["energy"] += 3
            pet1["feeling"] -= 8
            print pet1["name"] + " seems relunctant to eat. You presses " + pet1["name"] + "'s head into the bowl and forced her to finish it."
            time.sleep(2)  # delay 2 sec
        elif feedChoice == "4":   # to feed meat
            pet1["feeling"] += 10
            print "The fish must be yummy. You can see it from " + pet1["name"] + "'s face."
            time.sleep(2)  # delay 2 sec
        interact()

    elif interactionChoice == "4":  # do nothing
        print " "
        print "You look at " + pet1["name"] + ", and " + pet1["name"] + " looks back at you."
        time.sleep(2)  # delay 2 sec
        interact()

    else:
        print " "
        print "Invalid Comment. Please make a proper choice."
        time.sleep(2)  # delay 2 sec
        interact()

    def play():
        print " "
        print "Type '1' to pat " + pet1["name"]
        print "Type '2' to play a toy with "+ pet1["name"]
        print "Type '3' to play music to "+ pet1["name"]

interact()
