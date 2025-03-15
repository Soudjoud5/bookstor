def chiffrement(message, decalage):
    resultat = ""
    for lettre in message:
        if lettre.isalpha():
            maj = lettre.isupper()
            lettre = lettre.lower()
            lettre_chiffree = chr(((ord(lettre) - ord('a') + decalage) % 26) + ord('a'))
            if maj:
                lettre_chiffree = lettre_chiffree.upper()
            resultat += lettre_chiffree
        else:
            resultat += lettre
    return resultat


def dechiffrement(message, decalage):
    return chiffrement(message, -decalage)


# Exemple d'utilisation
message = input("Entrez votre message : ")
deplacement = int(input("Entrez la clé de décalage : "))

message_chiffre = chiffrement(message, deplacement)
print("Message chiffré :", message_chiffre)

message_dechiffre = dechiffrement(message_chiffre, deplacement)
print("Message déchiffré :", message_dechiffre)
