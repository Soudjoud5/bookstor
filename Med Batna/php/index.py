class Player:
    def __init__(self):
        self.name = ""
        self.symbol = ""

    def choose_name(self):
        while True:
            name = input("Enter your name (letters only): ")  
            if name.isalpha() == True :  
                self.name = name  
                break  
            print("Invalid name. Please use letters only.")
    def choose_symbol(self):
        while True:
            symbol = input(f"{self.name},choose your symbol (single letter):")
            if symbol.isalpha() and len(symbol) == 1:
                self.symbol = symbol.upper()
            break
        print("invalid symbol.")



class menu :
    def display_main_menu (self):
        print("welcome to my x-o game!")
        print("1.start game")
        print("2.quit game")
        choice = input ("enter your choice")
        return choice
    def display_endgame_menu (self):
        menu_text  ="""
          game over!
          1.restart game
          2.quit game
          enter your choice: """ 
        choice = input(menu_text)
        return choice
    

class board:
    def __init__(self) :
        self.board = [str(i) for i in range (1,10)]

    def display_board(self):
        for i in range(0, 9,3):
            print("|".join(self.board[i:i+3]))
            if i <6 :
                print("-"*5)
        
    def update_board(self,choice,symbol):
        
           if self.is_valid_move (choice):
               self.board[choice-1 ].isdigit= symbol
               return True 
        
        
               
        
        
