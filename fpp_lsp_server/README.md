# FPP Language Server Protocol

The design of the FPP language server implementation is roughly based on experience from
the previous VSCode-native implementation and the official rust-analyzer LSP.

The basic premise is to split analysis and diagnostics from the general file operations.
Analysis is a debounced operation that occurs once document edits have settled. Lexical and parsing
analysis is still performed synchronously (relatively synchronous) to document updates.
Parsing results will populate a cache to avoid unnecessary reprocessing. The cache will be used
during analysis and for generating realtime highlights to text documents.

Because analysis is run offline (out of the tight update loop of document edits), snapshots of the analysis
will be stored as it is updated periodically. While handling requests from the client, handlers can choose
to use the "latest" analysis results which _may_ not be perfectly inline will all document edits, or
synchronize to the latest document changes.

Request and notification handlers 
