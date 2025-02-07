import { Idl } from "@project-serum/anchor";

const idl: Idl = {
  version: "0.0.0",
  name: "multisig",
  instructions: [
    {
      name: "createMultisig",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "owners",
          type: {
            vec: "publicKey",
          },
        },
        {
          name: "threshold",
          type: "u64",
        },
        {
          name: "nonce",
          type: "u8",
        },
      ],
    },
    {
      name: "sendSol",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "destination",
          type: "publicKey",
        },
      ],
    },
    {
      name: "createTransaction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "pid",
          type: "publicKey",
        },
        {
          name: "accs",
          type: {
            vec: {
              defined: "TransactionAccount",
            },
          },
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
    },
    {
      name: "approve",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setOwners",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "owners",
          type: {
            vec: "publicKey",
          },
        },
      ],
    },
    {
      name: "changeThreshold",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "threshold",
          type: "u64",
        },
      ],
    },
    {
      name: "executeTransaction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Multisig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owners",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "threshold",
            type: "u64",
          },
          {
            name: "nonce",
            type: "u8",
          },
          {
            name: "ownerSetSeqno",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "Transaction",
      type: {
        kind: "struct",
        fields: [
          {
            name: "multisig",
            type: "publicKey",
          },
          {
            name: "programId",
            type: "publicKey",
          },
          {
            name: "accounts",
            type: {
              vec: {
                defined: "TransactionAccount",
              },
            },
          },
          {
            name: "data",
            type: "bytes",
          },
          {
            name: "signers",
            type: {
              vec: "bool",
            },
          },
          {
            name: "didExecute",
            type: "bool",
          },
          {
            name: "ownerSetSeqno",
            type: "u32",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "TransactionAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "isSigner",
            type: "bool",
          },
          {
            name: "isWritable",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 100,
      name: "InvalidOwner",
      msg: "The given owner is not part of this multisig.",
    },
    {
      code: 101,
      name: "NotEnoughSigners",
      msg: "Not enough owners signed this transaction.",
    },
    {
      code: 102,
      name: "TransactionAlreadySigned",
      msg: "Cannot delete a transaction that has been signed by an owner.",
    },
    {
      code: 103,
      name: "Overflow",
      msg: "Overflow when adding.",
    },
    {
      code: 104,
      name: "UnableToDelete",
      msg: "Cannot delete a transaction the owner did not create.",
    },
    {
      code: 105,
      name: "AlreadyExecuted",
      msg: "The given transaction has already been executed.",
    },
    {
      code: 106,
      name: "InvalidThreshold",
      msg: "Threshold must be less than or equal to the number of owners.",
    },
  ],
};

export default idl;
